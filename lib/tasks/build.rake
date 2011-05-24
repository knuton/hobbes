require 'lib/pretty_print'

include PrettyPrint

HOBBES_PATH = 'hobbes'
GRAMMAR_FILE = 'vava_proper'

desc 'Create a minified browser version'
task 'build:browser' => ['build:browser:dev', 'build:browser:min']

directory HOBBES_PATH

namespace :build do

  desc 'Create parser from JISON file'
  task :parser, :needs => [HOBBES_PATH] do
    `jison lib/#{GRAMMAR_FILE}.jison`
    if $?.to_i == 0
      FileUtils.mv("#{GRAMMAR_FILE}.js", file_path = File.join(HOBBES_PATH, 'compiler', 'parser.js'))
      puts "Saved generated parser as #{file_path}."
    end
  end

  namespace :browser do

    desc 'Uncompressed browser version'
    task :dev, :needs => 'hobbes.js' do
      src = src_for_node_path('/hobbes')
      wrapped_src = "var hobbes = function (exports) {\n  var require = 'lol', hobbes = exports;\n#{indent(src, 2)}\n  return exports;\n}({});\n"
      if File.open('hobbes-web.js', 'w') {|f| f.write(wrapped_src) }
        puts "Wrote browser version to hobbes-web.js."
      else
        puts "Couldn't save browser version."
      end
    end

    desc 'Minify the browser version'
    task :min, :needs => 'hobbes-web.js' do
      before = `ls -lh hobbes-web.js | awk '{print $5}'`.chomp
      status = `java -jar lib/gcl/compiler.jar --js=hobbes-web.js --js_output_file=hobbes-web.min.js`
      if $?.to_i == 0
        after = `ls -lh hobbes-web.min.js | awk '{print $5}'`.chomp
        puts "Went from #{before} to #{after}."
      else
        puts "Minifying failed:", status
      end
    end

    def recurse_require(file_name, pwd = [])
      begin
        src = File.read(file_name)
      rescue
        puts "!!! Error reading #{file_name} !!!"
      end
        # Replace assigned requires with assigned wrapped objects
      src.gsub(/[a-z]+\s*=\s*(require\(['"]\.((?:\/[a-z0-9_]+)+)['"]\))/) { |require_assignment|
        require_path = $2
        require_assignment.gsub($1) { |whole_match| replace_require_assignment(require_path, pwd) }
        # Replace requires splitting up between CommonJS and web
      }.gsub(/[a-z]+\s*=\s*(typeof\s+require\s*===\s*'function'\s*\?\s*[^:]+:\s*(require\(['"]\.((?:\/[a-z0-9_-]+)+)['"]\)))/) { |require_assignment|
        require_path = $3
        require_assignment.gsub($1) { |whole_match| replace_require_assignment(require_path, pwd) }
        # Replace non-assigned require statements by the required source
      }.gsub(/^(require\(['"]\.((?:\/[a-z0-9_]+)+)['"]\));/) { |require_call|
        src_for_node_path($2, pwd)
        # Remove require statements that are fallbacks for tested objects
      }.gsub(/\s*\|\|\s*require\(['"][^"']+['"]\);/, ';')
    end

    def replace_require_assignment(path, pwd)
      "function (exports) {\n#{indent(src_for_node_path(path, pwd), 2 * pwd.size)}\n  return exports;\n\n}({})"
    end

    def src_for_node_path(node_path, pwd = [])
      puts " + Processing #{node_path}."
      path_points = local_node_path_to_file_path_points(node_path, pwd)
      recurse_require(File.join(path_points), path_points[0..-2])
    end

    def local_node_path_to_file_path_points(path, pwd)
      path_points = path[1..-1].split('/')
      path_points.last << '.js'
      pwd + path_points
    end

  end

end
