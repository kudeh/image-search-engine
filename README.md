# Image-Search-Engine
Content-Based Image Retrieval System Implemented Using Python, Flask And OpenCV.
* Given a query image, this app returns other images from database in order of similar color content.
* Uses a color histogram to define the color content of an image, uses chi-squared distance to determine
how similar two image histograms are.

## Usage Guide
1. To use a different image dataset (optional)
    * Populate image DB in `app/static/images`
    * Then in Terminal (you can use a virtualenv): 
```bash
>> pip install -r requirements.txt
>> cd app
>> python index.py --dataset static/images --index index.csv
```

2. Run locally using Docker
    * Install [Docker](https://docs.docker.com/install/#supported-platforms)
    * Then in Terminal:
```bash
>> docker build --tag=imagesearch .
>> docker run -p 80:8000 imagesearch
```
* You should be able to access app at `localhost:80` in browser


### Sources
* [pyimagesearch.com](https://www.pyimagesearch.com/start-here-learn-computer-vision-opencv/)
* [flask docs](http://flask.pocoo.org)
* [content-based image retrieval](https://en.wikipedia.org/wiki/Content-based_image_retrieval)


Project was made possible thanks to the many guides provided by [@Adrian Rosebrock](https://twitter.com/pyimagesearch) on [pyimagesearch.com](https://www.pyimagesearch.com/start-here-learn-computer-vision-opencv/)
