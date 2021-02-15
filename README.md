# md-i18n

I18n for Markdown files.

Install: ```yarn global add md-i18n```

Put the file you want to translate into the ``docs`` file and run ``md-i18n`` in the parent directory to start the translation automatically.
The translated files will be stored in the ``i18n`` file.

Check [this](https://www.npmjs.com/package/deepl-scraper) website for available languages.

Command smaple: ```md-i18n --target=ja-JA --souce=en```


parent <- run command here

├─docs     <- file you want to translate

└─i18n     <- translated files will be stored here

## Why not asynchronous?
Because I don't want to overload the translation server and get into trouble.

## Example
![](https://cdn.discordapp.com/attachments/718050872663212086/808881641816719390/2021-02-09_205729.png)