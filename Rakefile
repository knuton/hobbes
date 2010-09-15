require 'rubygems'
require 'active_support/all'
$KCODE = 'UTF8'

task :default => :spec

namespace :spec do

  directory 'test/spec'
  desc 'Create a new Vava test suite'
  task :new, :suite_name, :subsuite_name do |t, args|
    abort "Suite title is missing." unless args[:suite_name]

    suite_file_name = args[:suite_name].parameterize('_')
    subsuite_file_name = (ssn = args[:subsuite_name]) ? ssn.parameterize('_') : nil
    suite_file_path = 'test/spec/' << suite_file_name << (subsuite_file_name ? '/' << subsuite_file_name : '') << '.yml'
    
    unless File.exists?(suite_file_path)
      yaml = <<-YML
suite: "#{args[:subsuite_name] || args[:suite_name]}"
section: 
specifications:
  
  - description: ""
YML
      if subsuite_file_name && !File.directory?(dirname = 'test/spec/' << suite_file_name)
        mkdir dirname
      end
      File.open(suite_file_path, 'w') {|f| f.write(yaml) }
      puts "Created spec file `#{suite_file_path}`."
    else
      puts "File exists. Opening it."
    end

    Kernel::exec("mvim", suite_file_path)
  end

end
