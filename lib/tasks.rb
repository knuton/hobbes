%w(annotations build spec test swiss).each do |taskgroup|
  load "lib/tasks/#{taskgroup}.rake"
end
