require 'yaml'

class ParseMingleInfo
  def initialize
    properties = YAML.load_file('properties.yml')
    f = File.new(properties["csv_file_path"])
    process(f.readlines)
  end

  def process(lines)
    @data = {}
    lines.each do |line|
      infos = line.split('|')
      @data[infos[0]] = {:title => infos[1], :type => infos[2], :status => infos[3]}
    end	
  end


  def type(number)
    fetch(@data[number], :type)
  end

  def title(number)
    fetch(@data[number], :title)
  end

  private
  def fetch(data, value)
    return data unless data
    data[value]
  end
end

p = ParseMingleInfo.new
puts p.type("596")
puts p.title("596")
