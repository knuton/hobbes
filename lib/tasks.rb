%w(annotations build spec).each do |taskgroup|
  load "lib/tasks/#{taskgroup}.rake"
end
