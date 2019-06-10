 


train_images;
train_labels;
# create the training datasets
dx_train = tf.data.Dataset.from_tensor_slices(train_images)
# apply a one-hot transformation to each label for use in the neural network
dy_train = tf.data.Dataset.from_tensor_slices(train_labels).map(lambda z: tf.one_hot(z, 10))
# zip the x and y training data together and shuffle, batch etc.
train_dataset = tf.data.Dataset.zip((dx_train, dy_train)).shuffle(500).repeat().batch(30)

iterator = tf.data.Iterator.from_structure(train_dataset.output_types,
                                               train_dataset.output_shapes)
next_element = iterator.get_next()

training_init_op = iterator.make_initializer(train_dataset)

def nn_model(in_data):
    bn = tf.layers.batch_normalization(in_data)
    fc1 = tf.layers.dense(bn, 900)
    fc = tf.reshape(fc1["x"], [-1, 30, 30, 1])
    # Convolutional Layer #1
  conv1 = tf.layers.conv2d(
      inputs=fc,
      filters=32,
      kernel_size=[5, 5],
      padding="same",
      activation=tf.nn.relu)

      # Pooling Layer #1
      pool1 = tf.layers.max_pooling2d(inputs=conv1, pool_size=[2, 2], strides=1)
    fc2 = tf.layers.dense(pool1, 50)
    fc3 = tf.layers.dense(fc2, 10)
    return fc3
# create the neural network model
logits = nn_model(next_element[0])

# add the optimizer and loss
loss = tf.reduce_sum(tf.nn.softmax_cross_entropy_with_logits_v2(labels=next_element[1], logits=logits))
optimizer = tf.train.AdamOptimizer().minimize(loss)
# get accuracy
prediction = tf.argmax(logits, 1)
equality = tf.equal(prediction, tf.argmax(next_element[1], 1))
accuracy = tf.reduce_mean(tf.cast(equality, tf.float32))
init_op = tf.global_variables_initializer()


# run the training
epochs = 500
with tf.Session() as sess:
    sess.run(init_op)
    sess.run(training_init_op)
    for i in range(epochs):
        l, _, acc = sess.run([loss, optimizer, accuracy])
        if i % 50 == 0:
            print("Epoch: {}, loss: {:.3f}, training accuracy: {:.2f}%".format(i, l, acc * 100))

print("Hello World")
print("test")
