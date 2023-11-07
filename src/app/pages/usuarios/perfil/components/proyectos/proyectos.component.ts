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
  nombre: string = ''
  horasDedicadas: number[] = []
  fecha: any[] = []
  mes: number = 0
  horasPorProyecto: any[] = []
  horasExtra: number[] = []
  numeroHoras: number = 0
  numeroHorasExtra: number[] = []
  totalHorasExtra: number = 0

  usuarios_id: any;
  fecha_inicio: any;
  fecha_fin: any;
  horasTotalesSemana: any;
  horasPorContrato: number = 40;



  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0
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

    this.cargarFechas()

  }

  /*
   Una zona de reporte de horas semanales para el que el trabajador vea si cumple con las horas semanales pactadas por contrato, o bien va por encima o por debajo de las mismas.
    */
  async cargarFechas() {
    try {

      this.usuarios_id = await this.usuariosService.getByprofile();
      console.log(this.usuarios_id)
      if (!this.usuarios_id || !this.fecha_inicio || !this.fecha_fin) {
        console.log('Falta información para cargar las fechas.');
        return;
      }

      const response = await this.usuariosService.getWeek(this.usuarios_id.id, this.fecha_inicio, this.fecha_fin);

      this.horasTotalesSemana = response.total_horas_semana
      console.log(this.horasTotalesSemana)
    } catch (error) {
      console.log('horas que no curraste')
    }
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
    this.horasExtra = await this.proyectosService.getHorasExtra(this.mes)

    console.log(this.horasExtra)
    if (idProyecto === '0') {
      this.barChartData = {
        labels: this.proyectos.map(proyecto => proyecto.nombre),
        datasets: [
          {
            data: this.horasPorProyecto[0].map((horasProyecto: any) => horasProyecto.total_horas_dedicadas),
            label: 'Todos los proyectos',
            backgroundColor: ['#007bff', '#198754', '#dc3545', '#ffc107'],
          },
        ]
      };
      console.log(this.horasPorProyecto[0])
    } else if (idProyecto === 'extra') {
      this.barChartData = {
        labels: this.horasExtra.map((nombreProyecto: any) => nombreProyecto.nombre_proyecto),
        datasets: [
          {
            data: this.horasExtra.map((horasProyecto: any) => horasProyecto.horas_extra_total),
            backgroundColor: '#ff0000'
          },
        ]
      }

    } else {
      if (this.registros.length !== 0) {
        for (let registro of this.registros) {
          //relleno la fecha, las horas de dicadas y el nombre de cada proyecto para rellenar la grafica por cada proyecto
          this.fecha.push(dayjs(registro.fecha).format('DD/MM'))
          this.horasDedicadas.push(registro.horas_dedicadas)
          this.nombre = registro.nombre
          console.log('horas extra', this.horasExtra)
          // el dia que se hagan mas de 8 horas que la barra se ponga roja
          const masDe8 = this.horasDedicadas.findIndex(horas => horas > 8);
          this.barChartData = {
            labels: this.fecha,
            datasets: [
              {
                data: this.horasDedicadas, label: this.nombre,
                backgroundColor: this.horasDedicadas.map((horas, index) => (index === masDe8 && horas > 8) ? '#ff0000' : '#007bff'),
              },
            ]
          }
          console.log('horas dedicadas', this.horasDedicadas)
        }
        console.log('horas dedicadas2', this.horasDedicadas)

        //meto SOLO las horas extras en un array
        this.numeroHorasExtra = this.horasExtra.map((horasProyecto: any) => horasProyecto.horas_extra_total)
        console.log(this.numeroHorasExtra)
        //aqui sumo todas las horas extras y las meto en una variable
        this.totalHorasExtra = Math.round(this.numeroHorasExtra.reduce((a, b) => a + b, 0))
        //aqui consigo la suma de todas las horas por proyecto.
        this.numeroHoras = Math.round(this.horasDedicadas.reduce((a, b) => a + b, 0))
        //vacio los valores de horas y fecha para que no se acumulen a lo anterior
        this.horasDedicadas = []
        this.fecha = []

      }

    }

  }
}

