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
      src = replace_require_calls('hobbes.js')
      File.open('hobbes-web.js', 'w') {|f| f.write(src) }
    end

    # Expects uglify-js to be somewhere in node's include path.
    desc 'Minify the browser version'
    task :min, :needs => 'hobbes-web.js' do
      before = `ls -lh hobbes-web.js | awk '{print $5}'`.chomp
      status = `lib/uglifyjs hobbes-web.js > hobbes-web.min.js`
      if $?.to_i == 0
        after = `ls -lh hobbes-web.min.js | awk '{print $5}'`.chomp
        puts "Went from #{before} to #{after}."
      else
        puts "Minifying failed:", status
      end
    end

    def replace_require_calls(file_name)
      begin
        src = File.read(file_name)
      rescue
        puts "Error reading #{file_name}."
      end
      src.gsub(/[a-z]+\s*=\s*(require\(['"]\.((?:\/[a-z_]+)+)['"]\));/) { |match|
        match.gsub($1, replace_require_call($2))
      }
    end

    def replace_require_call(path)
      "function (exports) {\n  #{path}\n  return exports;\n}({})"
    end

  end

end
