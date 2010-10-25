namespace :test do
  
  desc "Run Jasmine unit tests"
  task :units do
    puts `env NODE_PATH=test/unit/lib/jasmine-node/lib:test/unit/spec:. node test/unit/lib/jasmine-node/specs.js`
  end

end
