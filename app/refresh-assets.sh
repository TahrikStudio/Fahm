

# Trigger a build
cd ..
npm run build
cd app

# Clear current files
rm -rf www/static www/index.html

cp -r ../dist/* www/
rm www/static/css/*.map
rm www/static/js/*.map

# Replace
sed -i 's/\/static/.\/static/g' www/index.html
sed -i 's/\/static\/img/\.\.\/img/g' www/static/css/app*.css
sed -i 's///g' www/static/js/app*.js
sed -ri 's/i\.p\+\"static/\"static/g' www/static/js/app*.js