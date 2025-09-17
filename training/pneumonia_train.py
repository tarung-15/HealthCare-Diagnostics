import os
from glob import glob
from pathlib import Path
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, Flatten
from tensorflow.keras.applications import VGG16

# Resolve base directory
BASE_DIR = Path(__file__).resolve().parent.parent
DATASET_DIR = BASE_DIR / 'datasets' / 'chest_xray'

# Dataset directories
train_dir = DATASET_DIR / 'train'
test_dir = DATASET_DIR / 'test'

# Data generators
train_datagen = ImageDataGenerator(
    rescale=1./255,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True
)

test_datagen = ImageDataGenerator(rescale=1./255)

# Create data generators
training_set = train_datagen.flow_from_directory(
    train_dir,
    target_size=(224, 224),
    batch_size=4,
    class_mode='categorical'
)

test_set = test_datagen.flow_from_directory(
    test_dir,
    target_size=(224, 224),
    batch_size=4,
    class_mode='categorical'
)

# Load VGG16 model
IMAGE_SHAPE = (224, 224, 3)
vgg_model = VGG16(weights='imagenet', include_top=False, input_shape=IMAGE_SHAPE)

# Freeze base model layers
for layer in vgg_model.layers:
    layer.trainable = False

# Get number of output classes from training folder
classes = glob(str(train_dir / '*'))

# Build final model
x = Flatten()(vgg_model.output)
output = Dense(len(classes), activation='softmax')(x)
final_model = Model(inputs=vgg_model.input, outputs=output)

# Compile model
final_model.compile(
    loss='categorical_crossentropy',
    optimizer='adam',
    metrics=['accuracy']
)

# Show model summary
final_model.summary()

# Train model
final_model.fit(
    training_set,
    validation_data=test_set,
    epochs=5,
    steps_per_epoch=len(training_set),
    validation_steps=len(test_set)
)

# Save model
MODEL_PATH = BASE_DIR / 'our_model.h5'
final_model.save(MODEL_PATH)
print(f"Model trained and saved as '{MODEL_PATH}'")
