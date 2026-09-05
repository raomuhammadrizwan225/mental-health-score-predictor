# Student Mental Health Score Prediction

A machine learning web application that predicts a student's **mental health score** from daily habits, academic information, social media usage, sleep, physical activity, and stress level.

The project includes a trained **Random Forest regression pipeline**, a **FastAPI** backend, and a responsive **HTML/CSS/JavaScript** frontend.

 This project is for educational purposes only. The predicted score is not a medical diagnosis or professional mental health assessment.

## Features

- Predicts a student's mental health score on a 0–10 scale
- Uses a trained Random Forest regression model
- Includes preprocessing and prediction in one saved scikit-learn pipeline
- FastAPI backend with request validation
- Simple responsive web interface
- Interactive result gauge and score message
- Supports multiple social media platforms and student lifestyle inputs

## Tech Stack

- Python
- FastAPI
- Uvicorn
- Pandas
- scikit-learn
- Joblib
- Pydantic
- HTML
- CSS
- JavaScript

## Project Structure

```text
student-mental-health-score-prediction/
│
├── main.py
├── Mental_Health_Model.pkl
├── ML_Project.ipynb
├── Student Social Media And Mental Health Impact.csv
├── requirements.txt
├── index.html
├── style.css
├── script.js
├── .gitignore
└── README.md
```

### Main Files

- `main.py` — FastAPI backend and prediction endpoint
- `Mental_Health_Model.pkl` — trained machine learning pipeline
- `ML_Project.ipynb` — data analysis, preprocessing, model training, evaluation, and model saving
- `Student Social Media And Mental Health Impact.csv` — dataset used for model development
- `index.html` — frontend interface
- `style.css` — frontend styling
- `script.js` — form validation, API request, and result display logic
- `requirements.txt` — Python dependencies

## Model Information

The notebook compares Linear Regression and Random Forest models. The saved model used by the API is the **default Random Forest pipeline**.

Approximate test results recorded in the notebook:

- **R² Score:** 0.878
- **MAE:** 0.347
- **RMSE:** 0.464

The pipeline handles preprocessing automatically, including numeric scaling, ordinal encoding, one-hot encoding, and transformation of `Study_Hours`.

## How to Run the Project

### 1. Clone the Repository

```bash
git clone <your-github-repository-url>
cd student-mental-health-score-prediction
```

If you downloaded the project as a ZIP file, extract it and open a terminal inside the project folder.

### 2. Create a Virtual Environment

It is recommended to create a new virtual environment instead of using any old `venv` folder copied from another computer.

#### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

#### macOS / Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install the Dependencies

```bash
pip install -r requirements.txt
```

The saved model was created with **scikit-learn 1.9.0**. To avoid model-loading compatibility issues, make sure that version is installed:

```bash
pip install scikit-learn==1.9.0
```

### 4. Start the FastAPI Backend

Run:

```bash
uvicorn main:app --reload
```

The backend will start at:

```text
http://127.0.0.1:8000
```

You can also open the interactive FastAPI documentation at:

```text
http://127.0.0.1:8000/docs
```

Keep this terminal running.

### 5. Start the Frontend

Open a second terminal in the same project folder.

Run:

```bash
python -m http.server 5500
```

Then open this address in your browser:

```text
http://127.0.0.1:5500
```

The frontend is already configured in `script.js` to send prediction requests to:

```text
http://127.0.0.1:8000/predict
```

### 6. Make a Prediction

Fill in the student information on the web form, including:

- Age
- Gender
- Country
- Academic level
- Most-used social media platform
- Main purpose of social media use
- Average daily social media usage
- Daily phone unlocks
- Study hours
- Physical activity hours
- Sleep hours
- Stress level

Click the prediction button. The frontend sends the data to the FastAPI backend, the trained model generates a score, and the result is displayed on the page.

## API Endpoint

### `POST /predict`

Example request body:

```json
{
  "age": 22,
  "gender": "Male",
  "country": "Pakistan",
  "academic_level": "Undergraduate",
  "most_used_platform": "Instagram",
  "purpose_of_use": "Entertainment",
  "avg_daily_usage_hours": 5.0,
  "daily_unlocks": 150,
  "study_hours": 3.0,
  "physical_activity_hours": 1.5,
  "sleep_hours_per_night": 7.0,
  "stress_level": "Medium"
}
```

Example response:

```json
{
  "predicted_mental_health_score": 6.42
}
```

## Model Training

If you want to explore the machine learning workflow, open:

```text
ML_Project.ipynb
```

The notebook contains:

- Dataset inspection
- Exploratory data analysis
- Data cleaning
- Country grouping
- Feature preprocessing
- Train/test splitting
- Linear Regression training
- Random Forest training
- Hyperparameter tuning
- Model evaluation
- Model serialization with Joblib

## GitHub Notes

Before pushing the project to GitHub, do not upload local/generated files such as:

```text
venv/
.venv/
__pycache__/
*.pyc
.ipynb_checkpoints/
```

These entries are already covered by the project's `.gitignore`.

## License

This project is intended for learning, portfolio, and demonstration purposes.
