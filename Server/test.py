from flask import Flask,jsonify
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from flask_cors import CORS

app = Flask(__name__)
app.app_context()
CORS(app)
load_dotenv()
password=os.getenv('MONGODB_PASSWORD')
connection_url=f'mongodb+srv://bhargavbusiness644:{password}@cluster0.ih5hdfv.mongodb.net/'
client=MongoClient(connection_url)

db=client['AmplifAi']
collection=db['Songs']


@app.route("/<artist>",methods=['GET','POST'])
def get_songs(artist):
    songs=collection.find({'artist_name':{'$regex':artist,'$options':'i'}})
    song_list = [song for song in songs] 
    for song in song_list:
        song['_id'] = str(song['_id'])  # Convert ObjectId to string
    return jsonify(song_list)


@app.route("/songs/<sad>",methods=['GET','POST'])
def get_sad(sad):
    songs=collection.find({'tag': sad })
    song_list=[song for song in songs]
    # print(song_list)
    for song in song_list:
        song['_id']=str(song['_id'])
    return jsonify(song_list)

@app.route("/getAllSongs",methods=['GET'])
def get_all_song():
    songs=collection.find()
    song_list=[song for song in songs]
    for song in song_list:
        song['_id']=str(song['_id'])
    return jsonify(song_list)


if __name__ == '__main__':
    # with app.app_context():
    app.run(debug=True)
