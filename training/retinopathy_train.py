# =========================
# retinopathy_train.py
# =========================

import os
from pathlib import Path
import tensorflow as tf
import efficientnet.tfkeras as efn
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import kagglehub

#  Download dataset
dataset_path = kagglehub.dataset_download(
    "sovitrath/diabetic-retinopathy-224x224-gaussian-filtered"
)
print(" Dataset path:", dataset_path)

# Path to images folder
images_path = os.path.join(dataset_path, "gaussian_filtered_images", "gaussian_filtered_images")

#  Data Generators
datagen = ImageDataGenerator(
    rescale=1./255,
    zoom_range=0.2,
    width_shift_range=0.2,
    height_shift_range=0.2,
    validation_split=0.2
)

train_data = datagen.flow_from_directory(
    images_path,
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='training'
)

valid_data = datagen.flow_from_directory(
    images_path,
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='validation'
)

#  Learning Rate Scheduler
def lr_rate(epoch, lr):
    if epoch < 10:
        return 0.0001
    elif epoch <= 15:
        return 0.0005
    elif epoch <= 30:
        return 0.0001
    else:
        return lr * (epoch / (1 + epoch))

lr_callback = tf.keras.callbacks.LearningRateScheduler(lr_rate)

#  Model Creation
model = tf.keras.Sequential([
    efn.EfficientNetB0(
        input_shape=(224,224,3),
        weights='imagenet',
        include_top=False
    ),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(5, activation='softmax')
])

model.compile(
    optimizer="Adam",
    loss="categorical_crossentropy",
    metrics=["accuracy"]
)

#  Training
history = model.fit(
    train_data,
    validation_data=valid_data,
    callbacks=[lr_callback],
    epochs=10,
    verbose=1
)

# Save Model + Labels
# Save into top-level ml_models folder (not inside training/)
BASE_DIR = Path(__file__).resolve().parent.parent  
save_dir = BASE_DIR / "ml_models"
save_dir.mkdir(exist_ok=True)

model_path = save_dir / "efficientnet_retinopathy_model.h5"
model.save(model_path)

# Save class labels
labels_path = save_dir / "class_labels.txt"
with open(labels_path, "w") as f:
    for label in train_data.class_indices.keys():
        f.write(label + "\n")

print(f"Model saved at: {model_path}")
print(f" Labels saved at: {labels_path}")
