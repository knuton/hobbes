require 'lib/tasks/source_annotation_extractor'

%w(build spec).each do |taskgroup|
  load "lib/tasks/#{taskgroup}.rake"
end
