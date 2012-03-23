require 'rubygems'
require 'json'
require 'awesome_print'

class FileCommit
  attr_accessor :file_name, :raw_commits
end

raw_commits =  `  git log --format='&&&&&%h^^^%ci^^^%s%######' --name-only`
commit_chunks = raw_commits.split('&&&&&')
ap commit_chunks[1..-1]
commit_files_mapping = {}
commit_chunks[1..-1].each do |chunk|
  commit_metadata, raw_all_files = chunk.split('######')
  raw_all_files.split.each {|file| commit_files_mapping[file] ? commit_files_mapping[file] << commit_metadata : commit_files_mapping[file]=[commit_metadata]}
end
ap commit_files_mapping
top_commited_files = commit_files_mapping.sort_by{|k,v| v.size}[-10..-1].reverse
ap top_commited_files.collect {|file, commits|  {:file => file, :commit_size => commits.size}}.to_json
