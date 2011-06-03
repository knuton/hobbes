desc 'Replace newlines with \n'
task :nolines do
  text = File.open('IO.java', 'r') { |f| f.read }
  puts text.gsub(/\\/, "\\\\\\").gsub(/\n/, '\n').gsub("'", "\\\\'")
end
