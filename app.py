from flask import Flask, Response, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/services')
def services():
    return render_template('services.html')


@app.route('/contact')
def contact():
    return render_template('contact.html')


@app.route('/guide')
def guide():
    return render_template('guide.html')


@app.route('/privacy-policy')
def privacy_policy():
    return render_template('privacy-policy.html')


@app.route('/terms-and-conditions')
@app.route('/terms')
def terms():
    return render_template('terms-and-conditions.html')


@app.route('/robots.txt')
def robots():
    content = (
        "User-agent: *\n"
        "Allow: /\n"
        "Sitemap: https://skacrepairservice.in/sitemap.xml\n"
    )
    return Response(content, mimetype='text/plain')


@app.route('/sitemap.xml')
def sitemap():
    xml = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://skacrepairservice.in/</loc><priority>1.0</priority></url>
  <url><loc>https://skacrepairservice.in/services</loc><priority>0.9</priority></url>
  <url><loc>https://skacrepairservice.in/about</loc><priority>0.8</priority></url>
  <url><loc>https://skacrepairservice.in/contact</loc><priority>0.9</priority></url>
  <url><loc>https://skacrepairservice.in/guide</loc><priority>0.7</priority></url>
  <url><loc>https://skacrepairservice.in/privacy-policy</loc><priority>0.5</priority></url>
  <url><loc>https://skacrepairservice.in/terms-and-conditions</loc><priority>0.5</priority></url>
</urlset>"""
    return Response(xml, mimetype='application/xml')


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
