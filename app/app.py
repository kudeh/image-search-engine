import os
import cv2
import numpy as np
 

from flask import Flask, render_template, request, jsonify, redirect, url_for
from werkzeug.utils import secure_filename
 

from pyimagesearch.colordescriptor import ColorDescriptor
from pyimagesearch.searcher import Searcher


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

            imgList = [img for img in list(os.listdir(os.path.join(os.path.dirname(__file__), 'static/images/'))) if img[-4:] in ('.png', '.jpg', '.gif')]

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
 
        try:
 
            # initialize the image descriptor
            cd = ColorDescriptor((8, 12, 3))
 
            # load the query image and describe it
            from skimage import io
            import cv2

            query = cv2.imread(os.path.join(os.path.dirname(__file__), 'static/images/'+image_url))
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
 
        except Exception as e:
            print(str(e))
            # return error
            return jsonify({"sorry": "Sorry, no results! Please try again."}), 500

# run!
if __name__ == '__main__':
    app.run('0.0.0.0', debug=True)
