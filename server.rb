require 'sinatra'
require 'JSON'
require 'pry'

FILENAME = "votes.json"

def votes_info
  JSON.parse(File.read(FILENAME))
end

def query
  votes_info["query"]
end

def votes
  votes_info["options"]
end

def vote_options
  votes.keys
end

def update_votes_data(option, vote_num)
  new_info = votes_info
  new_info["options"][option] = vote_num
  File.open(FILENAME,"w") do |f|
    f.write(new_info.to_json)
  end
end

get "/" do
  redirect "/vote"
end

get "/vote" do
  erb :index, locals: { query: query, vote_options: vote_options, votes: votes}
end

post "/new_option" do
  option = params["option"]
  update_votes_data(option, 0)
  redirect "/vote"
end

post "/place_vote" do
  choice = params["choice"]
  update_votes_data(choice, votes[choice] + 1)
  redirect "/vote"
end
