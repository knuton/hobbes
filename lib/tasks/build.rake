HOBBES_PATH = 'hobbes'

directory HOBBES_PATH

namespace :build do

  desc "Create parser from JISON file"
  task :parser, :needs => [HOBBES_PATH] do
    `jison lib/vava.jison`
    `ruby -pi -e "sub('var vava =', 'hobbes.parser =')" vava.js`
    `ruby -pi -e "sub('if (typeof require !==', %Q-if ('undefined' !==-)" vava.js`
    FileUtils.mv("vava.js", File.join(HOBBES_PATH, "parser.js"))
  end

end
