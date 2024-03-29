<?php wp_reset_query(); 
global $user_ID, $post;
?>
<!-- MODAL BIG -->
<div class="modal fade" id="modal_bid">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">
					<i class="fa fa-times"></i>
				</button>
				<?php if( !(ae_get_option('invited_to_bid') && !fre_check_invited($user_ID, $post->ID)) ) { ?>
					<h4 class="modal-title"><?php _e('Set your bid:',ET_DOMAIN);?></h4>
				<?php } ?>
			</div>
			<div class="modal-body">
				<?php 
				if( ae_get_option('invited_to_bid') && !fre_check_invited($user_ID, $post->ID) ) {
						echo '<p class="lead  warning">';
						_e("Oops, You must be invited to bid this project", ET_DOMAIN);
						echo '</p>';
				}else{ ?>
				<div>
					<form role="form" id="bid_form" class="bid-form validateNumVal">
						<div class="form-group">
							<label for="bid_budget"><?php _e('Budget',ET_DOMAIN);?></label>
							<input type="number" name="bid_budget" id="bid_budget" class="form-control required number numberVal" min="0" />
						</div>

						<div class="form-group">
							<label for="Offers"><?php _e('What you can offer?',ET_DOMAIN);?></label><br>
							<input type="radio" name="offer" class="wt-offer" checked="checked" value="Skill to Cost">
							<label for="Offers"><?php _e('Skill to Cost',ET_DOMAIN);?></label><br>
							<input type="radio" name="offer"  class="wt-offer" value="Skill to Skill">
							<label for="Offers"><?php _e('Skill to Skill',ET_DOMAIN);?></label><br>
							<input type="radio" name="offer"  class="wt-offer" value="Cost to Cost">
							<label for="Offers"><?php _e('Cost to Cost',ET_DOMAIN);?></label><br>
							<input type="radio" name="offer"  class="wt-offer" value="Cost to Skill">
							<label for="Offers"><?php _e('Cost to Skill',ET_DOMAIN);?></label><br>

							<div id="div_trading">
							<label for="Offers"><?php _e('Trading (if its skill, which skill are you offering or if its cost how much are you paying?)',ET_DOMAIN);?></label>
							<input type="textarea" name="offerskill" id="offskills" placeholder="Skill"><br><br>
							<label for="Offers"><?php _e('For (if its skill, which skill you want to learn or if its cost how much you want for this project?)',ET_DOMAIN);?></label>
							<input type="textarea" name="offercost" id="offcost" placeholder="Cost">
							</div>

						</div>

						<div class="clearfix"></div>

						<div class="form-group">
							<label for="bid_time"><?php _e('Deadline',ET_DOMAIN);?></label>
							<div class="row">
								<div class="col-xs-8">
									<input type="number" name="bid_time" id="bid_time" class="form-control required number numberVal" min="1" />
								</div>
								<div class="col-xs-4">
									<select name="type_time">							
										<option value="day"><?php _e('days',ET_DOMAIN);?></option>
										<option value="week"><?php _e('week',ET_DOMAIN);?></option>
									</select>
								</div>
							</div>
						</div>

						<div class="clearfix"></div>
						

	                    <div class="form-group">
	                    	<label for="post_content"><?php _e('Descibe yourself briefly',ET_DOMAIN); ?></label>
	                    	<textarea id="bid_content" name="bid_content"></textarea>
	                        <?php //wp_editor('', 'bid_content', ae_editor_settings() );  ?>
						</div>		

	                    <div class="clearfix"></div>

						<input type="hidden" name="post_parent" value="<?php the_ID(); ?>" />
						<input type="hidden" name="method" value="create" />
						<input type="hidden" name="action" value="ae-sync-bid" />

						<?php do_action('after_bid_form'); ?>	

						<button type="submit" class="btn-submit btn-sumary btn-sub-create">
							<?php _e('Submit', ET_DOMAIN) ?>
						</button>
					</form>	
				</div>
			<?php } ?>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<script type="text/javascript">
	
jQuery('.wt-offer').click(function(){
	if(jQuery(this).val()=="Skill to Skill"){
		jQuery('#offskills').attr('placeholder','Skill')
		jQuery('#offcost').attr('placeholder','Skill')
	}
	else if(jQuery(this).val()=="Cost to Cost"){
		jQuery('#offskills').attr('placeholder','Cost')
		jQuery('#offcost').attr('placeholder','Cost')
	}else if(jQuery(this).val()=="Cost to Skill"){
		jQuery('#offskills').attr('placeholder','Cost')
		jQuery('#offcost').attr('placeholder','Skill')
	}else{
		jQuery('#offskills').attr('placeholder','Skill')
		jQuery('#offcost').attr('placeholder','Cost')
	}
})

</script>