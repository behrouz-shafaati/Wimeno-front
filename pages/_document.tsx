import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      })
      // this is client side cookie that you want
    const cookie = ctx.req ? ctx.req.headers.cookie : null
    console.log("cookie:",cookie)
    const initialProps = await Document.getInitialProps(ctx)

    return {...initialProps, locale: ctx?.locale || "fa"}
  }

  render() {
    return (
      <Html
        dir={this.props.locale === "fa" ? "rtl" : "ltr"}
        lang={this.props.locale}
      >
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }

}

export default MyDocument