%w(annotations build spec test).each do |taskgroup|
  load "lib/tasks/#{taskgroup}.rake"
end
