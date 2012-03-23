require 'json'
class Visualizer
	def commit_count(json)
		data = JSON.parse(json)
		base_color = "0000"		
		nodes = []
		index=1
		data["files"].each do |item|
			nodes << {"data" => {"File name" => item["file"], "playcount" => item["commit_size"], 
						"$color" =>  "#FF" + (index).to_s * 4, "$area" => item["commit_size"]},
			 "id" => item["file"].downcase.gsub(' ','_'), 
			 "name" => item["file"].downcase.gsub(' ','_')}			
			 index = index + 1
		end
		final_json = {"children" => nodes}.to_json
	end
end