import sys
import pickle
import sklearn
from sklearn.feature_extraction.text import CountVectorizer


cv = CountVectorizer()

lr_model = pickle.load(open('lr_model.sav', 'rb'))
cv = pickle.load(open('vectorizer.pickle', 'rb'))
print(sys.argv[1])
message = [sys.argv[1]]

vect = cv.transform(message).toarray()
print(lr_model.predict(vect))
