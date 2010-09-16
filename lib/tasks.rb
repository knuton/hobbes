require 'lib/tasks/source_annotation_extractor'

%w(spec).each do |taskgroup|
  load "lib/tasks/#{taskgroup}.rake"
end
