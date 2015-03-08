class Custommarkdownrenderer < Redcarpet::Render::HTML

  def table(header, body)
    "<table class=\"styleguide table table-bordered\">" \
      "#{header}#{body}" \
    "</table>"
  end

  def block_code(code, language)
    formatter = Rouge::Formatters::HTML.new(wrap: false)
    if language and language.include?('example')
      if language.include?('none')
        # with `none_example`, just the rendered html gets rendered
        lexer = Rouge::Lexer.find('none')
        render_html(code, language)
      else
        lexer = Rouge::Lexer.find(get_lexer(language))
        '<div class="codeExample">' + '<div class="exampleOutput clearfix">' + render_html(code, language) + '</div>' + '<div class="codeBlock"><pre>' + formatter.format(lexer.lex(code)) + '</pre></div>' + '</div>'
      end
    else
      lexer = Rouge::Lexer.find_fancy('guess', code)
      '<div class="codeBlock"><pre>' + formatter.format(lexer.lex(code)) + '</pre></div>'
    end
  end

  private
  def render_html(code, language)
    case language
      when 'haml_example'
        safe_require('haml', language)
        return Haml::Engine.new(code.strip).render(template_rendering_scope, {})
      else
        code
    end
  end

  def template_rendering_scope
    Object.new
  end

  def get_lexer(language)
    case language
      when 'haml_example'
        'haml'
      else
        'html'
    end
  end

  def safe_require(templating_library, language)
    begin
      require templating_library
    rescue LoadError
      raise "#{templating_library} must be present for you to use #{language}"
    end
  end
end

