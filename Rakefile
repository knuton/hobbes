require 'rubygems'
require 'active_support/all'
$KCODE = 'UTF8'
require 'yaml'
require 'rdiscount'

SPEC_PATH = 'test/spec'
DOC_PATH = 'doc/spec'

task 'default' => 'spec:html'
desc 'Generate uncolored HTML spec'
task 'spec:html' => 'spec:html:create'

directory SPEC_PATH
directory DOC_PATH

namespace :spec do

  desc 'Create a new Vava test suite'
  task :new, :suite_name, :subsuite_name, :needs => [SPEC_PATH] do |t, args|
    abort "Suite title is missing." unless args[:suite_name]

    suite_file_name = args[:suite_name].parameterize('_')
    subsuite_file_name = (ssn = args[:subsuite_name]) ? ssn.parameterize('_') : nil
    suite_file_path = SPEC_PATH + suite_file_name << (subsuite_file_name ? '/' << subsuite_file_name : '') << '.yml'
    
    unless File.exists?(suite_file_path)
      yaml = <<-YML
suite: "#{args[:subsuite_name] || args[:suite_name]}"
section: 
specifications:
  
  - description: ""
YML
      if subsuite_file_name && !File.directory?(dirname = SPEC_PATH + suite_file_name)
        mkdir dirname
      end
      File.open(suite_file_path, 'w') {|f| f.write(yaml) }
      puts "Created spec file `#{suite_file_path}`."
    else
      puts "File exists. Opening it."
    end

    Kernel::exec("mvim", suite_file_path)
  end
  
  namespace :html do

    desc 'Create an HTML version of the Vava spec'
    task :create, :colored, :needs => [DOC_PATH] do |t, args|
      html = <<-HTML
<!DOCTYPE html>
<html>
  <head>
    <title>Vava Language Specification</title>
    <style type="text/css">
    *.test-successful { color: green; }
    *.test-failed { color: red; }
    *.test-missing { color: yellow; }
    </style>
  </head>
  <body>
    <h1>Vava Language Specification</h1>
HTML
      yamls_to_suites(SPEC_PATH).each { |suite| html << suite_to_html(suite, !!args[:colored]) }
      html << <<-HTML
  </body>
</html>
HTML
      
      File.open("#{DOC_PATH}/index.html", 'w') {|f| f.write(html) }
    end

    desc 'Create a colored HTML version of the Vava spec'
    task :colored do
      Rake::Task['spec:html:create'].invoke(:colored)
    end

    def yamls_to_suites(dir_path)
      yaml_files = Dir.entries(dir_path).select { |entry| entry[-4,4] == '.yml' }
      suites = yaml_files.map { |file_name|
        suite_hash = YAML.load_file("#{dir_path}/#{file_name}")
        suite_hash['file_name'] = file_name
        if File.directory?(subpath = "#{dir_path}/#{file_name[0..-5]}")
          suite_hash['subsuites'] = yamls_to_suites(subpath)
        end

        suite_hash
      }.sort { |a,b|
        a['section'] <=> b['section']
      }
    end

    def suite_to_html(suite_hash, colored = false, depth = 1, parent_section = nil)
      section_title = RDiscount.new(suite_hash['suite']).to_html[3..-6]
      numbering = "#{parent_section ? parent_section + '.' : ''}#{suite_hash['section']}"
      html = "<h#{depth+1}>#{numbering}. #{section_title}</h#{depth+1}>\n"
      suite_hash['specifications'].each do |specification|
        paragraph = "#{RDiscount.new(specification['description']).to_html}\n"
        
        paragraph.insert(2, ' class="test-missing"') if colored

        html << paragraph
      end rescue true

      if suite_hash['subsuites']
        suite_hash['subsuites'].each { |subsuite|
          html << suite_to_html(subsuite, colored, depth + 1, numbering)
        }
      end

      html
    end
    
  end

end
