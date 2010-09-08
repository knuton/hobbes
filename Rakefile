require 'rubygems'
require 'active_support/inflector'

task :default => :spec

namespace :spec do

  desc 'Create a new Vava test suite'
  directory 'test/spec'
  task :new, :suite_name do |t, args|
    unless args[:suite_name]
      puts "Suite title is missing."
      exit
    end

    suite_file_name = ActiveSupport::Inflector.underscore(args[:suite_name])
    suite_file_path = 'test/spec/' << suite_file_name << '.yml'
    
    unless File.exists?(suite_file_path)
      puts "Creating spec file `#{suite_file_path}`."
      yaml = <<-YML
suite: "#{args[:suite_name]}"
specifications:
  
  - description: ""
YML
      File.open(suite_file_path, 'w') {|f| f.write(yaml) }
    else
      puts "File exists. Opening it."
    end

    Kernel::exec("mvim", suite_file_path)
  end

end
