module PrettyPrint

  def boxed(text)
    puts ('-' * text.size) << '----'
    puts "| #{text} |"
    puts ('-' * text.size) << '----'
  end

  def newline
    puts ""
  end

  def underlined(text)
    puts text
    puts "-" * text.size
  end

end
