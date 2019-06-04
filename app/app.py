import os
import cv2
import numpy as np
 

from flask import Flask, render_template, request, jsonify, redirect, url_for
from werkzeug.utils import secure_filename
 

from app.pyimagesearch.colordescriptor import ColorDescriptor
from app.pyimagesearch.searcher import Searcher


# create flask instance
app = Flask(__name__)

INDEX = os.path.join(os.path.dirname(__file__), 'index.csv')

# main route
@app.route('/')
def index():
    return render_template('index.html', preview="static/init-preview.png")

# image database url list route
@app.route('/list', methods=['POST'])
def image_list():

    if request.method == "POST":

        try:

            imgList = [img for img in list(os.listdir(os.path.join(os.path.dirname(__file__), 'static/images/'))) if img.endswith('.png')]

            return jsonify(imgList=imgList)
        
        except Exception as e:
            return jsonify({"sorry": "Sorry, no results! Please try again."}), 500


# search route
@app.route('/search', methods=['POST'])
def search():
 
    if request.method == "POST":

        RESULTS_ARRAY = []

        # get url
        image_url = request.form.get('img')
        print(image_url)
 
        try:
 
            # initialize the image descriptor
            cd = ColorDescriptor((8, 12, 3))
 
            # load the query image and describe it
            from skimage import io
            import cv2
            #query = io.imread("/home/kene/Documents/PyImageSearch/3D Histogram Descriptor Method With Web Interface/app/"+image_url)
            #print(os.path.join(os.path.dirname(__file__), 'static/queries/image_url'))
            query = cv2.imread(os.path.join(os.path.dirname(__file__), 'static/images/'+image_url))
            #query = io.imread(image_url)
            #query = (query * 255).astype("uint8")
            #(r, g, b) = cv2.split(query)
            #query = cv2.merge([b, g, r])
            #query = cv2.cvtColor(query, cv2.COLOR_BGR2RGB)
            features = cd.describe(query)
 
            # perform the search
            searcher = Searcher(INDEX)
            results = searcher.search(features)
 
            # loop over the results, displaying the score and image name
            for (score, resultID) in results:
                RESULTS_ARRAY.append(
                    {"image": str(resultID), "score": str(score)})
            # return success
            return jsonify(results=(RESULTS_ARRAY[:101]), preview="images/"+image_url)
            #resultSet=jsonify(results=(RESULTS_ARRAY[::-1][:5]))
            #return render_template('index.html', preview = "static/queries/"+filename, resultSet = jsonify(results=(RESULTS_ARRAY[::-1][:5])))
 
        except Exception as e:
            print(str(e))
            # return error
            return jsonify({"sorry": "Sorry, no results! Please try again."}), 500

# run!
if __name__ == '__main__':
    app.run('0.0.0.0', debug=True)
