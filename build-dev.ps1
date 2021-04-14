cd front/
$env:BASE_URL="http://localhost/PillsPick/front/dist/" 
$env:BASE_ROUTE="/PillsPick/"
$env:BASE_PUBLIC_ROUTE="/PillsPick/"
$env:NODE_ENV=""
yarn build
cd ../