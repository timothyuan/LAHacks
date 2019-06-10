from __future__ import absolute_import, division, print_function
import pathlib
import random
import tensorflow as tf
from tensorflow import keras
from sklearn.preprocessing import LabelBinarizer
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

import csv
import cv2

import numpy as np
#import matplotlib.pyplot as plt

tf.enable_eager_execution()

import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'


AUTOTUNE = tf.data.experimental.AUTOTUNE

#image and data pre-processing




import sys


#TO DO FOR TIMOTHY
#   get array of symptoms 2D train
results = []
with open("disease_db.csv") as csvfile:
    reader = csv.reader(csvfile)
    for row in reader: # each row is a list
        results.append(row)

dict = {}
for result in results:
    if result[0] in dict:
        dict[result[0]].append(result[1])
    else:
        dict[result[0]] = [result[1]]

diseases = {}
for arg in sys.argv[1:]:
    #print(arg)
    for item in dict[arg]:
        if item in diseases:
            diseases[item]+=1
        else:
            diseases[item]=1

lst = sorted(diseases, key=lambda x: -diseases[x])
print(lst);

# labels= list(dict)
# #print(labels[0])
# symptoms = list(dict.values())
# #print(symptoms[0])
#
#
# binary_symp = []
#
# for item in symptoms:
#     arr = []
#     for i in symp:
#         if i in item:
#             arr.append(1)
#         else:
#             arr.append(0)
#     binary_symp.append(arr)
# disease = []
# for i in range(len(labels)):
#     disease.append(i)
# #print(len(disease))
#
#
# np_disease = np.array(disease)
# np_symp = np.array(binary_symp)
#
# #133, 436
#
# model = keras.Sequential([
#   keras.layers.Dense(200, input_shape=(436,), activation="relu"),#trimming to smaller of nodes with bias and weights
#   keras.layers.Dense(133, activation="softmax" ),#number of diseases
#
# ])
#
# sgd = keras.optimizers.SGD(lr=.5, decay=1e-6, momentum=0.9, nesterov=True)
#
# model.compile(optimizer='sgd', loss = 'sparse_categorical_crossentropy', metrics=['accuracy'])
# model.fit(np_symp, np_disease, epochs=20, batch_size=32)


#   map to disease indices
#   array list of labels corresponding to symptoms (same index)
#   make np.arrray
#   split training data and test (rly just duplicate)
#   feed into model and affix numbers

# #data directory for images
# data_dir = "./ISIC_images"
# #root paths for data
# data_root = pathlib.Path(data_dir)
#
# #pathways to images
# for item in data_root.iterdir():
#   print(item)
#
# #pathway to each individual image
# all_image_paths = list(data_root.glob('*/*'))
# all_image_paths = [str(path) for path in all_image_paths]
# random.shuffle(all_image_paths)
#
# #verifier that pathways are correct
# for image in all_image_paths:
#   print(image)
#
# #label_names created/generated from filenames
# label_names = sorted(item.name for item in data_root.glob('*/') if item.is_dir())
# print(label_names)
#
# #unnecessary - corresponds each label to a give index
# label_to_index = dict((name, index) for index, name in enumerate(label_names))
# print(label_to_index)
#
# #assigns given medical condition to each image
# all_image_labels = list(pathlib.Path(path).parent.name for path in all_image_paths)
# print("First 10 labels indices: ", all_image_labels[:10])
#
# labels = []
#
# #assigns an array of the corresponding labels
# for label in all_image_labels:
#   labels.append(label)
#
#
# img_data = []
# print(len(all_image_paths))
# for image_path in all_image_paths:
#   image = cv2.imread(image_path)
#   #print(image)
#   #image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
#   image = cv2.resize(image, (32, 32)).flatten()
#   print(image.shape)
#   img_data.append(image)
#
#
# img_data = np.array(img_data, dtype="float")/255.0
# labels = np.array(labels)
#
# (trainX, testX, trainY, testY) = train_test_split(img_data, labels, test_size=0.25, random_state=42)
# lb = LabelBinarizer()
# trainY = lb.fit_transform(trainY)
# testY=lb.transform(testY)
#
#
# train = []
# for p in trainY:
#   train.append(np.argmax(p))
# print(train)
#
# train = np.array(train)
#
#
#
# model = keras.Sequential([
#   keras.layers.Dense(1024, input_shape=(3072,), activation="relu"),
#   keras.layers.Dense(4, activation="softmax" ),#number of diseases
#
# ])
#
# sgd = keras.optimizers.SGD(lr=0.1, decay=1e-6, momentum=0.9, nesterov=True)
#
# model.compile(optimizer='sgd', loss = 'sparse_categorical_crossentropy', metrics=['accuracy'])
#
#
#
#
# model.fit(trainX, train, epochs=5, batch_size=32)
#
# predictions = model.predict(testX, batch_size=32)
#
# train = []
# for p in testY:
#   train.append(np.argmax(p))
#
# train = np.array(train)
#
# #print(classification_report(train.argmax(axis=1), predictions.argmax(axis=1), target_names=lb.classes_))
#
# test_loss, test_acc = model.evaluate(testX, train)
# print(test_acc)
#
#
# for p in predictions:
#   print(np.argmax(p))
# print(train)
