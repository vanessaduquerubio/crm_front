import { Component, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';;
import * as dayjs from 'dayjs';
import { Proyecto } from 'src/app/interfaces/proyecto.interface';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})

export class ProyectosComponent {
  proyectosService = inject(ProyectosService)
  usuariosService = inject(UsuariosService)
  activatedRoute = inject(ActivatedRoute)

  proyectos: Proyecto[] = []
  registros: any[] = []
  nombre: any
  horasDedicadas: number[] = []
  fecha: any[] = []
  mes: number = 0
  horasPorProyecto: any[] = []
  horas: any
  numeroHoras: number = 0
  backgroundColor: string = ''


  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 1
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };

  barChartType: ChartType = 'bar';
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  }


  async ngOnInit() {
    //recupero todos los proyectos
    this.proyectos = await this.proyectosService.getProyectos()

  }

  cambioMes($event: any) {
    //recupero el valor de cada mes
    this.mes = $event.target.value
  }

  async cambioProyecto($event: any) {
    //consigo el id del proyecto con el valor del selector
    const idProyecto = $event.target.value
    //consigo el registro que rellena el grafico
    this.registros = await this.proyectosService.getRegistro(idProyecto, this.mes)
    this.horasPorProyecto = await this.proyectosService.getHour(this.mes)
    if (idProyecto === '0') {
      this.barChartData = {
        labels: this.proyectos.map(proyecto => proyecto.nombre),
        datasets: [
          {
            data: this.horasPorProyecto[0].map((horasProyecto: any) => horasProyecto.total_horas_dedicadas),
            label: 'Todos los proyectos',
            backgroundColor: ['#0d6efd', '#198754', '#dc3545', '#ffc107'], // Asignar el primer color del array
          },
        ]
      };
      console.log(this.horasPorProyecto[0])
    } else {
      if (this.registros.length !== 0) {
        for (let registro of this.registros) {
          //relleno la fecha, las horas de dicadas y el nombre de cada proyecto para rellenar la grafica por cada proyecto
          this.fecha.push(dayjs(registro.fecha).format('DD'))
          this.horasDedicadas.push(registro.horas_dedicadas)
          this.nombre = registro.nombre
          // el dia que se hagan mas de 8 horas que la barra se ponga roja
          const masDe8 = this.horasDedicadas.findIndex(horas => horas > 8);
          this.barChartData = {
            labels: this.fecha,
            datasets: [
              {
                data: this.horasDedicadas, label: this.nombre,
                backgroundColor: this.horasDedicadas.map((horas, index) => (index === masDe8 && horas > 8) ? '#ff0000' : '#0d6efd'),
              },
            ]
          }
        }

        //aqui consigo la suma de todas las horas por proyecto.
        this.numeroHoras = this.horasDedicadas.reduce((a, b) => a + b, 0)
        console.log(this.numeroHoras)
        //vacio los valores de horas y fecha para que no se acumulen a lo anterior
        this.horasDedicadas = []
        this.fecha = []
      } else {
        this.barChartData = {
          labels: [],
          datasets: []
        }

      }

    }


  }
}
