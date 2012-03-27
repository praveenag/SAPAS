require 'rubygems'
require 'json'
require_relative 'parse_mingle_info'

class GitParser

  def self.files_map
  	files_mapping = {}
		commit_chunks.each do |chunk|
		  commit_metadata, raw_all_files = chunk.split('######')
		  raw_all_files.split.select{|file| file.include?('app/')}.each do |file|
		  	file_info = files_mapping[file] || FileInfo.new(file)
		  	file_info.raw_commit = commit_metadata
		  	files_mapping[file] = file_info
		  end
		end
		files_mapping
  end

  def self.commit_chunks
    project_directory = YAML.load_file('properties.yml')['project_directory']
    raw_commits = `git --git-dir #{project_directory}/.git log --format='&&&&&%h^^^%ci^^^%s%######' --name-only`
		commit_chunks = raw_commits.split('&&&&&')
		commit_chunks[1..-1]
  end
end

class FileInfo
  attr_accessor :file_name, :raw_commits, :bug_count, :change_count, :card_numbers
  @@mingle_info = ParseMingleInfo.new

  def initialize(file_name)
  	@file_name = file_name
  	@raw_commits = []
  	@card_numbers = []
  	@bug_count=0
  	@change_count=0
  end

  def raw_commit=(commit)
  	self.raw_commits << commit
  	process_commit
  end

  private
  def process_commit
  	number = self.raw_commits.last.match(/.#(?<number>[0-9]*)/)
  	self.card_numbers << number.nil? ? nil : self.raw_commits.last.match(/.#(?<number>[0-9]*)/)["number"]
  	increment_count @@mingle_info.type(card_numbers.last)
  end


  def increment_count(type)
  	if (!type.nil? && type == "Defect") || raw_commits.last.downcase.include?('fix') || raw_commits.last.downcase.include?('bug')
  		self.bug_count = self.bug_count + 1
  	else
  		self.change_count = self.change_count + 1
  	end
  end

end
