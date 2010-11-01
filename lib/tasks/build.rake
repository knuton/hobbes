HOBBES_PATH = 'hobbes'
GRAMMAR_FILE = 'vava_proper'

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

end
