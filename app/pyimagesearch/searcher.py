# import the necessary packages
import numpy as np
import csv

class Searcher:
	def __init__(self, indexPath):
		#store our index path
		self.indexPath = indexPath

	def search(self, queryFeatures, limit=101):
		#initialize dictionary of results
		results = {}

		#open the index file
		with open(self.indexPath) as f:
			#initialize the CSV reader
			reader = csv.reader(f)

			#loop over the rows in the index
			for row in reader:
				#parse out the image ID and features, then compute the
				#chi-squared dist. b/w the features in our index
				#and our query features
				features = [float(x) for x in row[1:]]
				d = self.chi2_distance(features, queryFeatures)

				#Update dictionsary
				#key is image id, value is similarity
				results[row[0]] = d

			#close reader
			f.close()

		#sort in order of relevance
		results = sorted([(v,k) for (k,v) in results.items()])

		#return our (limited) results
		return results[:limit]

	def chi2_distance(self, histA, histB, eps=1e-10):
		#compute chi-squared distance
		d = 0.5 * np.sum([((a-b)**2)/(a+b+eps)
			for (a,b) in zip(histA, histB)])

		# return the chi-squared distance
		return d
