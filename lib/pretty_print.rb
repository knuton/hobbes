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

  def indent(text, n)
    if n >= 0
      text.gsub(/^/, ' ' * n)
    else
      text.gsub(/^ {0,#{-n}}/, "")
    end
  end

end
