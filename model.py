import tensorflow as tf
from tensorflow.keras.applications import DenseNet121
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping
from sklearn.metrics import classification_report, accuracy_score
import numpy as np

DATASET_PATH = "F:\\citrus_dataset"
IMAGE_SIZE = (224, 224)
BATCH_SIZE = 32
LEARNING_RATE = 0.001
CLASS_NAMES = [
    "Citrus canker", "Citrus greening", "Citrus mealybugs", "Die back",
    "Foliage damaged", "Healthy leaf", "Powdery mildew", "Shot hole",
    "Spiny whitefly", "Yellow leaves"
]


data_gen = ImageDataGenerator(
    rescale=1.0/255.0,
    validation_split=0.2,
    horizontal_flip=True,
    vertical_flip=True,
    rotation_range=20,
    zoom_range=0.2,
    shear_range=0.2,
    fill_mode='nearest'
)

train_gen = data_gen.flow_from_directory(
    DATASET_PATH,
    target_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    shuffle=True,
    subset='training'
)

val_gen = data_gen.flow_from_directory(
    DATASET_PATH,
    target_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    shuffle=True,
    subset='validation'
)


base_model = DenseNet121(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
base_model = Model(inputs=base_model.input, outputs=base_model.layers[79].output)


for layer in base_model.layers:
    layer.trainable = False


x = GlobalAveragePooling2D()(base_model.output)
x = Dropout(0.5)(x)
x = Dense(256, activation='relu')(x)
x = Dropout(0.5)(x)
output = Dense(len(CLASS_NAMES), activation='softmax')(x)

model = Model(inputs=base_model.input, outputs=output)


optimizer = Adam(learning_rate=LEARNING_RATE)
model.compile(optimizer=optimizer, loss='categorical_crossentropy', metrics=['accuracy'])


early_stopping = EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)


history = model.fit(
    train_gen,
    validation_data=val_gen,
    epochs=5,
    callbacks=[early_stopping]
)


for layer in base_model.layers:
    layer.trainable = True

optimizer = Adam(learning_rate=LEARNING_RATE / 10)
model.compile(optimizer=optimizer, loss='categorical_crossentropy', metrics=['accuracy'])


history_fine_tune = model.fit(
    train_gen,
    validation_data=val_gen,
    epochs=20,
    callbacks=[early_stopping]
)


val_gen.reset()
y_true = val_gen.classes
y_pred = model.predict(val_gen)
y_pred_classes = np.argmax(y_pred, axis=1)

print("Classification Report:")
print(classification_report(y_true, y_pred_classes, target_names=CLASS_NAMES))

accuracy = accuracy_score(y_true, y_pred_classes)
print(f"Overall Accuracy: {accuracy * 100:.2f}%")

save_path = os.path.expanduser(r'C:/Users/abdju/OneDrive/Desktop/model/citrus_disease_model_densenet.keras')
model.save(save_path)
