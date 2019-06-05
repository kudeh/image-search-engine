# Image-Search-Engine
Content-Based Image Retrieval System Implemented Using Python, Flask And OpenCV.

## Usage Guide
1. To Use a different image dataset (optional)
    * Populate image DB in `app/static/images`
    * Then in Terminal (you can use a virtualenv): 
```
pip install -r requirements.txt
cd app
python index.py --dataset static/images --index index.csv
```

2. Run Locally using Docker
    * Install [Docker](https://docs.docker.com/install/#supported-platforms)
    * Then in Terminal:
```
docker build --tag=imagesearch .
docker run -p 80:8000 imagesearch
```
* You should be able to access app at `localhost:80` in browser
