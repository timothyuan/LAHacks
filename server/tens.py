from __future__ import absolute_import, division, print_function
import pathlib
import random
import tensorflow as tf
from tensorflow import keras
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

from keras.models import model_from_json

import keras.initializers

# import keras
# import h5py
from keras.models import load_model

import cv2

import numpy as np
#import matplotlib.pyplot as plt

import sys
#tf.enable_eager_execution()

import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

g = open("result.txt", "r+")
g.truncate(0)
g.close()

AUTOTUNE = tf.data.experimental.AUTOTUNE
#image and data pre-processing

#data directory for images
data_dir = "./ISIC_images"
#root paths for data
data_root = pathlib.Path(data_dir)

#pathways to images
# for item in data_root.iterdir():
#   print(item)

#pathway to each individual image
all_image_paths = list(data_root.glob('*/*'))
all_image_paths = [str(path) for path in all_image_paths]
random.shuffle(all_image_paths)

#verifier that pathways are correct
# for image in all_image_paths:
#   print(image)

#label_names created/generated from filenames
label_names = sorted(item.name for item in data_root.glob('*/') if item.is_dir())
#print(label_names)

#unnecessary - corresponds each label to a give index
label_to_index = dict((name, index) for index, name in enumerate(label_names))
#print(label_to_index)

# #assigns given medical condition to each image
# all_image_labels = list(pathlib.Path(path).parent.name for path in all_image_paths)
# print("First 10 labels indices: ", all_image_labels[:10])

# labels = []

# #assigns an array of the corresponding labels
# for label in all_image_labels:
#   labels.append(label)


# img_data = []
# print(len(all_image_paths))
# for image_path in all_image_paths:
#   image = cv2.imread(image_path)
#   #print(image)
#   #image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
#   image = cv2.resize(image, (32, 32))
#   #print(image.shape)
#   img_data.append(image)


# img_data = np.array(img_data, dtype="float")/255.0
# labels = np.array(labels)

# (trainX, testX, trainY, testY) = train_test_split(img_data, labels, test_size=0.25, shuffle=False)
# # lb = LabelBinarizer()
# # trainY = lb.fit_transform(trainY)
# # testY=lb.transform(testY)



# # helpl = lb.transform(labels)
# # hell = []
# # for p in helpl:
# #   hell.append(np.argmax(p))
# # print(hell)


# train = []
# for p in trainY:
#   train.append(label_to_index[p])
# #print(labels)

# train = np.array(train)



# model = keras.Sequential([
#   keras.layers.Conv2D(filters=32, kernel_size=(3,3), data_format="channels_last", input_shape=(32,32,3)),
#   keras.layers.MaxPooling2D(pool_size=(2, 2)),
#   keras.layers.Conv2D(filters=64, kernel_size=(3,3), padding="same"),
#   keras.layers.MaxPooling2D(pool_size=(2, 2)),
#   keras.layers.Dropout(0.7),
#   keras.layers.Conv2D(filters=128, kernel_size=(3,3), padding="same"),
#   keras.layers.MaxPooling2D(pool_size=(2, 2)),
#   keras.layers.Flatten(),
#   keras.layers.Dense(100, activation="relu"),
#   keras.layers.Dense(2, activation="softmax" ),

# ])

# sgd = keras.optimizers.SGD(lr=0.003, decay=1e-6, momentum=0.9, nesterov=True)

# model.compile(optimizer='adam', loss = 'sparse_categorical_crossentropy', metrics=['accuracy']) #adam, sgd for optimizers, lr = 0.005




# model.fit(trainX, train, epochs=5, batch_size=1000)

# model_json = model.to_json()
# with open("model.json", "w") as json_file:
#   json_file.write(model_json)

# model.save_weights("model.h5")

json_file = open('model.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
loaded_model = model_from_json(loaded_model_json)

loaded_model.load_weights("model.h5")
# model.save('model.h5')
# del model

# model = load_model('model.h5')

#predictions = loaded_model.predict(testX, batch_size=32)

# train = []
# for p in testY:
#   train.append(label_to_index[p])
# print(train)

# train = np.array(train)

#print(classification_report(train.argmax(axis=1), predictions.argmax(axis=1), target_names=lb.classes_))
loaded_model.compile(optimizer='adam', loss = 'sparse_categorical_crossentropy', metrics=['accuracy'])
# test_loss, test_acc = loaded_model.evaluate(testX, train)
# print(test_acc)


imageS = []
image_test = cv2.imread('file.jpg')
image_test = cv2.resize(image_test, (32, 32))
#image_test = np.expand_dims(image_test) #, axis=0)
imageS.append(image_test)
label = 'benign'

# i = label_to_index[label]
test = []
# test.append(i)
img_data1 = np.array(imageS, dtype="float")/255.0
# labels1 = np.array(test)

pre = loaded_model.predict(img_data1, batch_size=32)
#loss, acc = loaded_model.evaluate(img_data1, labels1)
#print(acc)
#print(labels1)

result = ''
for p in pre:
  n = np.argmax(p)
  if n==0:
    result = 'benign'
  if n==1:
    result = 'malignant'

g = open("result.txt", "w+")
g.write(result)
g.close()
# for p in pre:
#   print(np.argmax(p))
# print(train)
