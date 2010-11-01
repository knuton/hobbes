HOBBES_PATH = 'hobbes'

directory HOBBES_PATH

namespace :build do

  desc 'Create parser from JISON file'
  task :parser, :needs => [HOBBES_PATH] do
    `jison lib/vava_proper.jison`
    FileUtils.mv('vava_proper.js', File.join(HOBBES_PATH, 'compiler', 'parser.js'))
  end

end
