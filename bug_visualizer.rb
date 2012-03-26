require 'json'
require '/Users/ashok/projects/SAPAS/git_parser.rb'

class BugVisualizer
	def top_culprits
		files_map = GitParser.files_map
    	files_map.sort_by{|file,file_info| file_info.bug_count}[-20..-1].reverse
	end

	def commit_count
		
		top_file_map = top_culprits
		base_color = "0000"		
		nodes = []
		index=1
		top_file_map.each do |file_name, file_info|
			nodes << {"data" => {"File name" => file_name, "playcount" => file_info.bug_count,
						"$color" =>  "rgb(#{255 - (index * 10)},0,0)", "$area" => file_info.bug_count},
			 "id" => file_name.downcase.gsub(' ','_'), 
			 "name" => file_name.downcase.gsub(' ','_')}			
			 index = index + 1
		end
		final_json = {"children" => nodes}.to_json
	end
end