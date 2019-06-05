# start with a base image
FROM ubuntu:16.04

# install dependencies
RUN apt-get update
RUN apt-get install -y python python-pip
RUN apt-get install -y libglib2.0-0

# Set the working directory to /app
#WORKDIR /app

# Copy the current directory contents into the container
COPY . .

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 8000

#
WORKDIR app

# Run app.py when the container launches
CMD ["gunicorn", "-b", "0.0.0.0:8000", "app:app"]