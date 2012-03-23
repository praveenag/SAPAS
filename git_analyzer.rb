require 'rubygems'
require 'json'
require 'awesome_print'

class FileCommit
  attr_accessor :file_name, :raw_commits, :bug_count, :change_count
  
  def commit_chunks
	raw_commits =  `  git log --format='&&&&&%h^^^%ci^^^%s%######' --name-only`
	commit_chunks = raw_commits.split('&&&&&')
	commit_chunks[1..-1]
  end

  def card_number(commit_metadata)
  	commit_metadata.match(/.#(?<number>[0-9]*)/)
  	match_data ? match_data["number"] : nil
  end

  def update_bug_count(file_commit)
  	file_commit.bug_count = file_commit.bug_count + 1
  end

  def update_change_count(file_commit)
  	file_commit.change_count = file_commit.change_count + 1
  end
end

commit_files_mapping = {}
commit_chunks.each do |chunk|  
  commit_metadata, raw_all_files = chunk.split('######')
  raw_all_files.split.each do |file| 
  	if file.include?('app/')
  		commit_files_mapping[file] ? commit_files_mapping[file] << commit_metadata : commit_files_mapping[file]=[commit_metadata]
  	end
  end
end
# ap commit_files_mapping
top_commited_files = commit_files_mapping.sort_by{|k,v| v.size}[-10..-1].reverse
final_json = {"files" => top_commited_files.collect{|file, commits|  {:file => file, :commit_size => commits.size}} }
# ap final_json.to_json
