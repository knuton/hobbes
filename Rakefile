require 'rubygems'
require 'active_support/all'
$KCODE = 'UTF8'
require 'lib/tasks/source_annotation_extractor'
require 'lib/tasks/spec_suite'

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
    suite_file_path = "#{SPEC_PATH}/#{suite_file_name}#{subsuite_file_name ? '/' << subsuite_file_name : ''}.yml"
    
    unless File.exists?(suite_file_path)
      yaml = <<-YML
suite: "#{args[:subsuite_name] || args[:suite_name]}"
section: 
specifications:
  
  - description: ""
YML
      if subsuite_file_name && !File.directory?(dirname = "#{SPEC_PATH}/#{suite_file_name}")
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
    p.test-successful, p.test-failed, p.test-missing { padding: 0.5em; }
    h2.test-successful, h3.test-successful { border-bottom: 5px solid #74D668; }
    p.test-successful { background-color: #74D668; }
    h2.test-failed, h3.test-failed { border-bottom: 5px solid #E87F7D; }
    p.test-failed { background-color: #E87F7D; }
    h2.test-missing, h3.test-missing { border-bottom: 5px solid #E8D47D; }
    p.test-missing { background-color: #E8D47D; }
    </style>
  </head>
  <body>
    <h1>Vava Language Specification</h1>
HTML
      suites = SpecSuite.from_yml_dir(SPEC_PATH)
      suites.each { |suite| html << suite.to_html(!!args[:colored]) }
      html << <<-HTML
  </body>
</html>
HTML
      
      File.open("#{DOC_PATH}/index.html", 'w') {|f| f.write(html) }
      puts "Created HTML doc for #{suites.size} (main) suites."
    end

    desc 'Create a colored HTML version of the Vava spec'
    task :colored do
      Rake::Task['spec:html:create'].invoke(:colored)
    end

  end

  task :notes do
    ["OPTIMIZE", "FIXME", "TODO"].each do |annotation|
      SourceAnnotationExtractor.enumerate(annotation, ['test/spec'])
    end    
  end

end
