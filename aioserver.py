import json
from aiohttp import web
import aiohttp_jinja2
import jinja2
from robocluster import Device

routes = web.RouteTableDef()

serverd = Device('webui', 'rover')
serverd.storage.TargetReached = False

@serverd.every('1s')
async def toggle():
    serverd.storage.TargetReached = not\
            serverd.storage.TargetReached

@routes.get('/')
@aiohttp_jinja2.template('index.tpl')
async def index(request):
    print('Home page')
    return {}

@routes.get('/vue')
async def vuepage(request):
    print('vuetest')
    return web.FileResponse('./vue/index.html')

@routes.get('/req/{name}')
async def req(request):
    name = request.match_info['name']
    print('data request {}'.format(name))
    if name in serverd.storage:
        return web.json_response(serverd.storage[name])
    else:
        return web.Response(text='none')

@routes.post('/data/{name}')
async def post(request):
    print('data post {}'.format(request.match_info['name']))

app = web.Application()
aiohttp_jinja2.setup(app,
    loader=jinja2.FileSystemLoader('./views'))

app.router.add_routes(routes)
app.router.add_static('/static', './static/')

serverd.start()
web.run_app(app)
