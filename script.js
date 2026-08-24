(() => {
  const API_BASE = "http://127.0.0.1:8000";

  const form = document.getElementById("predict-form");

  const submitButton =
    document.getElementById("submit-button");

  const formResetButton =
    document.getElementById("form-reset-button");

  const runAgainButton =
    document.getElementById("run-again-button");

  const tryAgainButton =
    document.getElementById("try-again-button");


  const idleState =
    document.getElementById("idle-state");

  const loadingState =
    document.getElementById("loading-state");

  const resultState =
    document.getElementById("result-state");

  const errorState =
    document.getElementById("error-state");


  const scoreNumber =
    document.getElementById("score-number");

  const scoreLabel =
    document.getElementById("score-label");

  const scoreDescription =
    document.getElementById("score-description");

  const resultGauge =
    document.getElementById("result-gauge");

  const errorMessage =
    document.getElementById("error-message");


  const stressInput =
    document.getElementById("stress_level");

  const stressButtons =
    document.querySelectorAll(
      "#stress-selector button"
    );


  stressButtons.forEach((button) => {

    button.addEventListener("click", () => {

      stressButtons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      stressInput.value =
        button.dataset.value;

      clearFieldError(stressInput);

    });

  });


  function showState(name) {

    idleState.hidden =
      name !== "idle";

    loadingState.hidden =
      name !== "loading";

    resultState.hidden =
      name !== "result";

    errorState.hidden =
      name !== "error";

  }


  function getFieldContainer(input) {

    return input.closest(".field");

  }


  function setFieldError(
    input,
    message
  ) {

    const container =
      getFieldContainer(input);

    if (!container) {
      return;
    }


    container.classList.add(
      "has-error"
    );


    const error =
      container.querySelector(
        ".field-error"
      );


    if (error) {
      error.textContent = message;
    }

  }


  function clearFieldError(input) {

    const container =
      getFieldContainer(input);

    if (!container) {
      return;
    }


    container.classList.remove(
      "has-error"
    );


    const error =
      container.querySelector(
        ".field-error"
      );


    if (error) {
      error.textContent = "";
    }

  }


  function clearAllErrors() {

    form
      .querySelectorAll(".field")
      .forEach((field) => {

        field.classList.remove(
          "has-error"
        );

      });


    form
      .querySelectorAll(".field-error")
      .forEach((error) => {

        error.textContent = "";

      });

  }


  function readNumber(name) {

    const value =
      form.elements[name].value.trim();


    if (value === "") {
      return NaN;
    }


    return Number(value);

  }


  function collectFormData() {

    return {

      age:
        readNumber("age"),

      gender:
        form.elements.gender.value,

      country:
        form.elements.country.value.trim(),

      academic_level:
        form.elements.academic_level.value,

      most_used_platform:
        form.elements.most_used_platform.value,

      purpose_of_use:
        form.elements.purpose_of_use.value,

      avg_daily_usage_hours:
        readNumber(
          "avg_daily_usage_hours"
        ),

      daily_unlocks:
        readNumber(
          "daily_unlocks"
        ),

      study_hours:
        readNumber(
          "study_hours"
        ),

      physical_activity_hours:
        readNumber(
          "physical_activity_hours"
        ),

      sleep_hours_per_night:
        readNumber(
          "sleep_hours_per_night"
        ),

      stress_level:
        stressInput.value

    };

  }


  function validateForm(data) {

    const errors = [];


    const numberFields = [

      {
        name: "age",
        min: 10,
        max: 100
      },

      {
        name:
          "avg_daily_usage_hours",
        min: 0,
        max: 24
      },

      {
        name:
          "daily_unlocks",
        min: 0,
        max: Infinity
      },

      {
        name:
          "study_hours",
        min: 0,
        max: 24
      },

      {
        name:
          "physical_activity_hours",
        min: 0,
        max: 24
      },

      {
        name:
          "sleep_hours_per_night",
        min: 0,
        max: 24
      }

    ];


    numberFields.forEach((field) => {

      const input =
        form.elements[field.name];

      const value =
        data[field.name];


      if (Number.isNaN(value)) {

        errors.push([
          input,
          "This field is required."
        ]);

        return;

      }


      if (value < field.min) {

        errors.push([
          input,
          `Minimum value is ${field.min}.`
        ]);

        return;

      }


      if (
        field.max !== Infinity &&
        value > field.max
      ) {

        errors.push([
          input,
          `Maximum value is ${field.max}.`
        ]);

      }

    });


    const requiredTextFields = [

      "gender",

      "country",

      "academic_level",

      "most_used_platform",

      "purpose_of_use"

    ];


    requiredTextFields.forEach(
      (name) => {

        if (!data[name]) {

          errors.push([
            form.elements[name],
            "This field is required."
          ]);

        }

      }
    );


    if (!data.stress_level) {

      errors.push([
        stressInput,
        "Choose a stress level."
      ]);

    }


    return errors;

  }


  function setLoading(isLoading) {

    submitButton.disabled =
      isLoading;


    submitButton.classList.toggle(
      "loading",
      isLoading
    );

  }


  function getScoreMessage(score) {

    if (score < 4) {

      return {

        title:
          "Signal: strained",

        description:
          "Your responses suggest a heavier load right now. Sleep, screen time and daily recovery may need more attention."

      };

    }


    if (score < 7) {

      return {

        title:
          "Signal: balanced",

        description:
          "Your daily rhythm looks fairly steady, with some room to improve consistency and recovery."

      };

    }


    return {

      title:
        "Signal: strong",

      description:
        "Your current habits point to a steady and well-supported daily routine."

    };

  }


  function displayResult(score) {

    const safeScore =
      Math.max(
        0,
        Math.min(
          10,
          score
        )
      );


    const message =
      getScoreMessage(safeScore);


    scoreNumber.textContent =
      safeScore.toFixed(1);


    scoreLabel.textContent =
      message.title;


    scoreDescription.textContent =
      message.description;


    const rotation =
      -45 +
      (
        safeScore /
        10
      ) *
      180;


    resultGauge.style.transform =
      `translateX(-50%) rotate(${rotation}deg)`;


    showState("result");

  }


  function displayError(message) {

    errorMessage.textContent =
      message;


    showState("error");

  }


  form
    .querySelectorAll(
      "input, select"
    )
    .forEach((input) => {

      input.addEventListener(
        "input",
        () => {

          clearFieldError(input);

        }
      );


      input.addEventListener(
        "change",
        () => {

          clearFieldError(input);

        }
      );

    });


  form.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      clearAllErrors();


      const data =
        collectFormData();


      const errors =
        validateForm(data);


      if (errors.length > 0) {

        errors.forEach(
          ([input, message]) => {

            setFieldError(
              input,
              message
            );

          }
        );


        const firstInput =
          errors[0][0];


        if (
          firstInput &&
          typeof firstInput.focus ===
          "function"
        ) {

          firstInput.focus();

        }


        return;

      }


      setLoading(true);

      showState("loading");


      try {

        const response =
          await fetch(
            `${API_BASE}/predict`,
            {

              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body:
                JSON.stringify(data)

            }
          );


        if (!response.ok) {

          let message =
            `Request failed with status ${response.status}.`;


          try {

            const body =
              await response.json();


            if (
              typeof body.detail ===
              "string"
            ) {

              message =
                body.detail;

            }

          } catch (error) {

          }


          displayError(message);

          return;

        }


        const result =
          await response.json();


        const score =
          result
            .predicted_mental_health_score;


        if (
          typeof score !==
          "number"
        ) {

          displayError(
            "The server responded, but the score was missing."
          );

          return;

        }


        displayResult(score);

      } catch (error) {

        displayError(
          `Could not connect to ${API_BASE}. Make sure the backend is running.`
        );

      } finally {

        setLoading(false);

      }

    }
  );


  function resetInterface() {

    form.reset();

    clearAllErrors();


    stressInput.value = "";


    stressButtons.forEach(
      (button) => {

        button.classList.remove(
          "active"
        );

      }
    );


    showState("idle");

  }


  formResetButton.addEventListener(
    "click",
    resetInterface
  );


  runAgainButton.addEventListener(
    "click",
    () => {

      showState("idle");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );


  tryAgainButton.addEventListener(
    "click",
    () => {

      showState("idle");

    }
  );

})();