import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
csv_path = BASE_DIR / 'datasets' / 'heart.csv'
model_save_path = BASE_DIR / 'ml_models' / 'heart_model.pkl'

df = pd.read_csv(csv_path)
X = df.drop('target', axis=1)
y = df['target']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

os.makedirs(BASE_DIR / 'ml_models', exist_ok=True)
joblib.dump(model, model_save_path)
print("Heart disease model saved at:", model_save_path)
