from flask import Flask, render_template, request
from utils.calendar_utils import crear_evento

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/agendar', methods=['POST'])
def agendar():
    nombre = request.form['nombre']
    telefono = request.form['telefono']
    fecha = request.form['fecha']
    hora = request.form['hora']
    nota = request.form.get('nota', '')

    crear_evento(nombre, telefono, fecha, hora, nota)

    return render_template('confirmacion.html', nombre=nombre, fecha=fecha, hora=hora)

if __name__ == '__main__':
    app.run()
