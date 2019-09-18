Component({
  properties: {
    Power: {
      type: Boolean,
      value: '',
    },
    Name: {
      type: String,
      value: '',
    },
    Number_Start: {
      type: String,
      value: '',
    },
    Number_End: {
      type: String,
      value: '',
    },
    
  },
  data: {
    
  },
  ready: function () {
    
  },
  methods: {

    Input_Number_Start:function(e){
      if(this.properties.Number_End != ""){
        if (e.detail.value < this.properties.Number_End) {
          this.setData({
            Number_Start: e.detail.value
          })
          this.triggerEvent('Number_Start', e.detail.value)
        }else{
          this.setData({
            Number_Start: ""
          })
          this.triggerEvent('Number_Start', "")
        }
      }else{
        this.setData({
          Number_Start: e.detail.value
        })
        this.triggerEvent('Number_Start', e.detail.value)
      }
    },

    Input_Number_End: function (e) {
      if (this.properties.Number_Start != ""){
        if (e.detail.value > this.properties.Number_Start) {
          this.setData({
            Number_End: e.detail.value
          })
          this.triggerEvent('Number_End', e.detail.value)
        }else{
          this.setData({
            Number_End: ""
          })
          this.triggerEvent('Number_End', "")
        }
      }else{
        this.setData({
          Number_End: e.detail.value
        })
        this.triggerEvent('Number_End', e.detail.value)
      }
    },

    numberpicker_reset:function(){
      this.setData({
        Number_Start: '',
        Number_End: '',
      })
      this.triggerEvent('Number_Start', '');
      this.triggerEvent('Number_End', '');
    },

  }

})

